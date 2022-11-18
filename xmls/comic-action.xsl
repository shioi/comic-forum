<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
    <html>
        <body>
            <h2>Comics </h2>
            <table border="2.5">
                <tr bgcolor="#9acd32">
                    <th>Title</th>
                    <th>Status</th>
                    <th>Number of Chapters</th>
                    <th>Number of Volumes</th>
                    <th>Authors</th>
                </tr>
                <xsl:for-each select="comiclist/comic">
                <tr>
                    <td><xsl:value-of select="name"/></td>
                    <td><xsl:value-of select="status"/></td>
                    <td><xsl:value-of select="Chapter_Number"/></td>
                    <td><xsl:value-of select="Volume_Number"/></td>
                    <xsl:for-each select="Authors">
                <tr>
                    <td><xsl:value-of select="Author_Name"/></td>
                </tr>
                    </xsl:for-each>
                
                </tr>
                </xsl:for-each>
            </table>
        </body>
    </html>
</xsl:template>
</xsl:stylesheet>